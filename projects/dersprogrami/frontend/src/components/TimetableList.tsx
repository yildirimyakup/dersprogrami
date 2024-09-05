// components/TimetableList.tsx

import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

type Timetable = {
  id: number;
  course: string;
  teacher: string;
};

interface TimetableListProps {
  timetable: Timetable[];
}

const TimetableList: React.FC<TimetableListProps> = ({ timetable }) => {
  return (
    <List>
      {timetable.map((item) => (
        <ListItem key={item.id}>
          <ListItemText primary={`${item.course} - ${item.teacher}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default TimetableList;
