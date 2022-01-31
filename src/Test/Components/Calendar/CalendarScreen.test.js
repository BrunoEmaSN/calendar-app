import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../Components/Calendar/CalendarScreen';
import { messages } from '../../../Helpers/calendar-messages-es';
import { types } from '../../../Types';
import { eventSetActive } from '../../../Store/Calendar/EventActions';
import { act } from '@testing-library/react';

jest.mock('../../../Store/Calendar/EventActions', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
  Calendar: {
    events:  [],
    activeEvent: null
  },
  Auth: {
    uid: null
  },
  UI: {
    modalOpen: false
  }
};
let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <CalendarScreen />
  </Provider>
)
describe('Pruebas en <CalendarScreen/>', () => {
  test('debe de mostrar correctamente', () => {
    expect( wrapper ).toMatchSnapshot();
  });
  
  test('Preubas con las interacciones del calendario', () => {
    const calendar = wrapper.find('Calendar');
    const calendarMessages = calendar.prop('messages');
    expect( calendarMessages ).toEqual( messages );
    
    calendar.prop('onDoubleClickEvent')();
    expect( store.dispatch ).toHaveBeenCalledWith({ type: types.UIOpenModal });

    calendar.prop('onSelectEvent')({ start: '1' });
    expect( eventSetActive ).toHaveBeenCalledWith({ start: '1' });
    
    act(() => {
      calendar.prop('onView')('week');
      expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');
    })
  });
  
});
