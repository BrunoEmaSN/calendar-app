import React from 'react'

export const CalendarEvent = ({ event }) => {
    const { title, user } = event;
    return (
        <div>
            <div>
                <span>{ title }</span>
            </div>
            <strong>{ user.name }</strong>
        </div>
    )
}
