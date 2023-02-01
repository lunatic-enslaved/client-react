import React from 'react';

import { DayMealGroups } from '@/widgets/day/meal-groups';
import { Context } from '@/shared/context';

const CaloriesPlannerPage = () => {
  document.title = 'Планировщик калорий';

  const context = React.useContext(Context);

  return (
    <div className="p-4 w-full h-full">
      <DayMealGroups date={context.date} />
    </div>
  );
};

export default CaloriesPlannerPage;
