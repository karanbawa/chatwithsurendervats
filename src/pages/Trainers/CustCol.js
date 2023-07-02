import React from 'react';
import { Link } from 'react-router-dom';

const Name = (cell) => {
    return cell.value ? cell.value : '';
};

const Email = (cell) => {
    return cell.value ? cell.value : '';
};

const Phone = (cell) => {
    return cell.value ? cell.value : '';
};

const JoiningDate = (cell) => {
    return cell.value ? cell.value : '';
};

export {
    Name,
    Email,
    Phone,
    JoiningDate,
};