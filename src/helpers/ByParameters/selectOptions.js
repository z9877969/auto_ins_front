import { VEHICLES_GROUPS } from '../../constants/index';

export const vehicleGroupsOptions = [
  {
    label: 'Легковий автомобіль',
    value: VEHICLES_GROUPS.B.main,
  },
  {
    label: 'Вантажний автомобіль',
    value: VEHICLES_GROUPS.C.main,
  },
  {
    label: 'Автобус',
    value: VEHICLES_GROUPS.D.main,
  },
  {
    label: 'Мотоцикл',
    value: VEHICLES_GROUPS.A.main,
  },
  {
    label: 'Причеп',
    value: VEHICLES_GROUPS.EF.main,
  },
  {
    label: 'Всі категорії',
    value: '',
  },
];
export const vehicleTypesOptions = [
  {
    label: 'Мотоцикл/моторолер - до 300 см3',
    value: 'A1',
  },
  {
    label: 'Мотоцикл/моторолер - більш як 300 см3',
    value: 'A2',
  },
  {
    label: 'Легковий автомобіль - до 1600 см3',
    value: 'B1',
  },
  {
    label: 'Легковий автомобіль - 1601 - 2000 см3',
    value: 'B2',
  },
  {
    label: 'Легковий автомобіль - 2001 - 3000 см3',
    value: 'B3',
  },
  {
    label: 'Легковий автомобіль - більш як 3000 см3',
    value: 'B4',
  },
  {
    label:
      'Легковий электромобіль (виключно з силовим электродвигуном, крім гібридних авто)',
    value: 'B5',
  },
  {
    label: 'Вантажний автомобіль - до 2т',
    value: 'C1',
  },
  {
    label: 'Вантажний автомобіль - більш як 2т',
    value: 'C2',
  },
  {
    label: 'Автобус - до 20 місць',
    value: 'D1',
  },
  {
    label: 'Автобус - більше як 20 місць',
    value: 'D2',
  },
  {
    label: 'Причеп до вантажівки',
    value: 'E',
  },
  {
    label: 'Причеп до легкового авто',
    value: 'F',
  },
];

// disabled category that no supported -Start
// const disabledCategories = ['C', 'D', 'E', 'F'];
// export const withDisabledSelectCategoryOptions = vehicleGroupsOptions.map(
//   (option) =>
//     disabledCategories.some((c) => option.value.includes(c))
//       ? { ...option, isDisabled: true }
//       : option
// );

// const withDisabledSelectAllCategoryOptions = vehicleTypesOptions.map(
//   (option) =>
//     disabledCategories.some((c) => option.value.includes(c))
//       ? { ...option, isDisabled: true }
//       : option
// );
// disabled category that no supported -End

export function selectAutoCategory(category) {
  switch (category) {
    case 'EF':
      return vehicleTypesOptions.filter(
        (categ) => categ.value.includes('E') || categ.value.includes('F')
      );
    default:
      return category
        ? vehicleTypesOptions.filter((categ) => categ.value.includes(category))
        : vehicleTypesOptions;
  }
}
export function selectAddressOptions(arr) {
  return arr.map((address) => ({
    label: address.nameFull,
    value: address.id,
  }));
}

/* 
A1 - мотоцикл / моторолер - до 300 см3
A2 - мотоцикл / моторолер - более 300 см3
B1 - легковой автомобиль - до 1600 см3
B2 - легковой автомобиль - 1601 - 2000 см3
B3 - легковой автомобиль - 2001 - 3000
B4 - легковой автомобиль - более 3000 см3
B5 - легковой электромобиль (исключительно с силовым электродвигателем, кроме гибридных авто)
C1 - грузовой автомобиль - до 2т
C2 - грузовой автомобиль - более 2т
D1 - автобус - до 20 человек
D2 - автобус - более 20 человек
E - прицеп к грузовому авто
F - прицеп к легковому авто
*/
