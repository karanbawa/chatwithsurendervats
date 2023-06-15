import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = str => {
    return (
        str === "" || str === undefined ? "" : str.toLowerCase()
    );
};



const CourseName = (cell) => {
    return cell.value ? cell.value : '';
};

const CourseCategory = (cell) => {
    return cell.value ? cell.value : '';
};




const CourseStatus = (cell) => {
    return (
        <Badge
            className={"font-size-12 badge-soft-" +
                (cell.value === "Active" ? "success" : "danger" && cell.value === "Pending" ? "warning" : "danger")}
        >
            {cell.value}
        </Badge>
    );
};

export {

    CourseName,
    CourseCategory,
    CourseStatus
   
};