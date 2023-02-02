import { formatNumber } from '@/shared/lib/formatNumber';

import { Product } from './types';

interface NutrientsInfoProps {
  products: Product[];
  caloriesPlan: number;
  carbsPlan: number;
  proteinsPlan: number;
  fatsPlan: number;
}

export const NutrientsInfo = (props: NutrientsInfoProps) => {
  const nutrientGroups = [
    { name: 'Белки', plan: props.proteinsPlan, fact: 0 },
    { name: 'Жиры', plan: props.fatsPlan, fact: 0 },
    { name: 'Углеводы', plan: props.carbsPlan, fact: 0 },
    { name: 'Калории', plan: props.caloriesPlan, fact: 0 }
  ];

  return (
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {nutrientGroups.map((nutrient) => (
        <div
          key={nutrient.name}
          className="relative bg-white py-4 px-4 shadow rounded-lg overflow-hidden">
          <dt>
            {/* <div className="absolute bg-sky-500 rounded-md p-3">
              <component
                :is="nutrient.icon"
                className="h-4 w-4 text-white"
                aria-hidden="true"
              />
            </div> */}
            <p className="ml-14 text-sm font-medium text-gray-500 truncate">{nutrient.name}</p>
          </dt>
          <dd className="ml-14 flex items-baseline">
            <p className="text-base font-semibold text-gray-900">
              {formatNumber(nutrient.fact, 0)} /{formatNumber(nutrient.plan, 0)}
            </p>
          </dd>
        </div>
      ))}
    </dl>
  );
};
