import type { PriceFilterProps } from '@/types/filter';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '@/state/slices/filters/filterSlice';

// Reusable component for one price filter
const PriceFilter = ({ label, filterKey }: PriceFilterProps) => {
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('M');
    const dispatch = useDispatch()

    const handleChange = (newAmount: string, newUnit: string) => {
        if (newAmount) {
            dispatch(setFilter({ key: filterKey, value: `${newAmount}${newUnit}` }));
        } else {
            dispatch(setFilter({ key: filterKey, value: '' }));
        }
    };

    const formatExpanded = (amount: string, unit: string): string => {
        const num = parseFloat(amount);
        if (!amount || isNaN(num)) return '';
        const multipliers: Record<string, number> = { K: 1_000, M: 1_000_000, B: 1_000_000_000 };
        const full = num * multipliers[unit];
        return `₦${full.toLocaleString()}`;
    }; //Tooltip to explain to users

    const expanded = formatExpanded(amount, unit);

    return (
        <div className='flex flex-col gap-1'>

            {/* Input row */}
            <div className='flex items-center bg-white shadow-lg rounded-md overflow-hidden'>
                <input
                    type='number'
                    placeholder='e.g. 340'
                    value={amount}
                    className='py-4 px-4 w-28 outline-none text-neutral-600 [appearance:textfield]'
                    onChange={(e) => {
                        setAmount(e.target.value);
                        handleChange(e.target.value, unit);
                    }}
                />

                <div className='w-px h-6 bg-neutral-200' />

                <select
                    title={label}
                    value={unit}
                    className='py-4 px-3 outline-none text-neutral-600 bg-transparent cursor-pointer'
                    onChange={(e) => {
                        setUnit(e.target.value);
                        handleChange(amount, e.target.value);
                    }}
                >
                    <option value='K'>K — Thousand</option>
                    <option value='M'>M — Million</option>
                    <option value='B'>B — Billion</option>
                </select>
            </div>

            {/* Hint before typing / expanded value while typing */}
            <p className='text-xs text-neutral-400 px-1 h-4'>
                {expanded ? expanded : `e.g. 340M = ₦340,000,000`}
            </p>

        </div>
    );
};

export default PriceFilter;