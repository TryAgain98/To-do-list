import React, { forwardRef} from "react"
import { Button } from 'reactstrap';
import moment from 'moment';

export const sizeButtonTwoWord = {width: '7rem'} as React.CSSProperties
export const CustomDatePicker = forwardRef((props: any, ref) => (
    <Button className="datepicker-custom" outline onClick={props.onClick}>
         {moment(props.value).format('DD MMMM YYYY')}
    </Button>
));