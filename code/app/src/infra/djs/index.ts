import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import { optionService } from "@services";
// import { find } from "lodash";
// import { logger } from "./logger";
// import { debug } from './debug';
// import { find } from 'lodash';
// import optionsService from '@services/options.service';

dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;

// export const convertDate = (date: Dayjs = djs(), timeZone: string = "") => {
//   logger.convertDate({ date, timeZone });
//   if (!timeZone) {
//     return date;
//   }
//   const tzItem = find(optionService.data.resetting, { value: timeZone });
//   logger.convertDate("tzItem", tzItem);
//   const selectedDate = date;

//   const targetZoneDate = djs()
//     .utcOffset((tzItem?.offset ?? 0) / 60)
//     .year(selectedDate.year())
//     .month(selectedDate.month())
//     .date(selectedDate.date())
//     .hour(selectedDate.hour())
//     .minute(selectedDate.minute())
//     .second(selectedDate.second());

//   logger.convertDate(targetZoneDate);

//   return targetZoneDate;
// };
