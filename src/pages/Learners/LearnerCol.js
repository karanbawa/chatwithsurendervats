import React from 'react';
import { Link } from 'react-router-dom';

const CustId = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const Name = (cell) => {
    return cell.value ? cell.value : '';
};

const Email = (cell) => {
    return cell.value ? cell.value : '';
};

const Phone = (cell) => {
    return cell.value ? cell.value : '';
};

const WalletBalances = (cell) => {
    return cell.value ? cell.value : '';
};

const JoiningDate = (cell) => {
    return cell.value ? cell.value : '';
};

export {
    CustId,
    Name,
    Email,
    Phone,
    WalletBalances,
    JoiningDate,
};