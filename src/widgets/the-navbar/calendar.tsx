import React from 'react';
import { DatePicker, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { Context } from '@/shared/context';

export const Calendar = () => {
  const { date, setDate } = React.useContext(Context);

  const onPrevButtonClick = () => {
    setDate(date.subtract(1, 'day'));
  };
  const onNextButtonClick = () => {
    setDate(date.add(1, 'day'));
  };

  return (
    <div className="ml-4 flex items-center md:ml-6">
      <Button shape="circle" icon={<LeftOutlined />} onClick={onPrevButtonClick} />
      <DatePicker value={date} onChange={(d) => d && setDate(d)} className="mx-2" />
      <Button shape="circle" icon={<RightOutlined />} onClick={onNextButtonClick} />
    </div>
  );
};
