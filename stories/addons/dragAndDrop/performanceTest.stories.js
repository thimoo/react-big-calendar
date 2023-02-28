import React, { Profiler } from 'react'
import { Calendar, dayjsLocalizer, momentLocalizer } from '../../../src'
import withDragAndDrop from '../../../src/addons/dragAndDrop'
import moment from 'moment'
//import 'moment-timezone'
//moment.tz.setDefault('America/New_York')
const localizer = momentLocalizer(moment)

const DnDCalendar = withDragAndDrop(Calendar)

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)
dayjs.tz.setDefault('America/New_York')
// const localizer = dayjsLocalizer(dayjs)

export default {
  title: 'Addons/Drag and Drop',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

const events = []

const eventLengthInSec = 60
const numEvents = 500

for (let i = 1; i < 10080; i++) {
  events.push({
    title: `e${i}`,
    id: i,
    start: new Date(1667692800000 + i * eventLengthInSec * 1000),
    end: new Date(1667692800000 + (i + 1) * eventLengthInSec * 1000),
  })
}

const slotGroupPropGetter = () => ({
  style: {
    minHeight: 100,
  },
})

export function PerformanceTest() {
  return (
    <div>
      <Profiler
        id="Calendar"
        onRender={(...c) => console.log('render Duration', c[1], c[2])}
      >
        <DnDCalendar
          dayLayoutAlgorithm="no-overlap"
          events={events}
          localizer={localizer}
          defaultDate={new Date(2022, 10, 6)}
          defaultView={'week'}
          timeslots={5}
          step={1}
          slotGroupPropGetter={slotGroupPropGetter}
        />
      </Profiler>
    </div>
  )
}

PerformanceTest.storyName = 'DnD stress-test'
