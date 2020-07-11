import React, { useState, useEffect, useMemo } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import isEqual from "lodash/isEqual";
import { useDispatch, useSelector } from "react-redux";
import { saveDay } from "../../../actions";
import { TOTAL_HOURS, MAJOR_PARTS_DURATION } from "../../pageUrls";
import HourInput from "../../../components/input/dropdown/hourMinuteInput";

export const HoursOfSleep = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [hoursOfSleep, setHoursOfSleep] = useState(currentDay.hoursOfSleep || {hours: 0, minutes: 0});
    const isMissingHours = useMemo(() => hoursOfSleep.hours === "" || hoursOfSleep.minutes === "", [hoursOfSleep]);
    
    useEffect(() => {
        if (!isEqual(hoursOfSleep, currentDay.hoursOfSleep)) dispatch(saveDay({...currentDay, hoursOfSleep}));
    }, [hoursOfSleep])

    return <PageWrapper back={{link: MAJOR_PARTS_DURATION}} forward={{disabled: isMissingHours, link: TOTAL_HOURS}}>
       <div> <p>How many hours do you want to sleep?</p><HourInput {...hoursOfSleep} onBlur={setHoursOfSleep} /></div>
    </PageWrapper>
}
export default HoursOfSleep