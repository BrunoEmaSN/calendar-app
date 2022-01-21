import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Navbar } from '../UI/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../Helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../Store/UI/UIActions';
import { eventActiveCleaning, eventSetActive } from '../../Store/Calendar/EventActions';
import { AddNewFab } from '../UI/AddNewFab';
import { DeleteEventFab } from '../UI/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.Calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) => {
        dispatch( openModal() );
    }

    const onSelected = (e) => {
        dispatch( eventSetActive( e ) );
    }

    const onSelectSlot = (e) => {
        dispatch( eventActiveCleaning() );
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#E2FFA5',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />
            <BigCalendar
                localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelected }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                onView={ onViewChange }
                view={ lastView }
                components={{ event: CalendarEvent }}
            />
            <AddNewFab />
            { activeEvent && <DeleteEventFab /> }
            <CalendarModal />
        </div>
    )
}
