import { IconButton, TextField } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import * as React from 'react';
import { usePersistFunction } from '../../core/usePersistFunction';

export type ItemPoolFormProps = {
	onAddItem: (item: string) => boolean;
};

export const ItemPoolForm: React.VoidFunctionComponent<ItemPoolFormProps> = ({
	onAddItem = (item: string) => false,
}) => {
	const [inputValue, setInputValue] = React.useState('');
	const [inputError, setInputError] = React.useState('');

	const onFormSubmit = usePersistFunction((evt: React.FormEvent) => {
		evt.stopPropagation();
		evt.preventDefault();
		if (!inputValue) {
			setInputError('Please input the item you want to add');
			return;
		}
		if (onAddItem(inputValue)) {
			setInputValue('');
		} else {
			setInputError('Input is already in the list');
		}
	});

	const onInputChange = React.useCallback(
		(evt: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(evt.target.value);
			setInputError('');
		},
		[setInputError, setInputValue]
	);

	return (
		<form className="flex-grow" onSubmit={onFormSubmit}>
			<TextField
				fullWidth={false}
				className="w-1/2"
				value={inputValue}
				onChange={onInputChange}
				error={!!inputError}
				helperText={inputError}
				InputProps={formInputAddorment}
			/>
		</form>
	);
};
const formInputAddorment = {
	className: 'pr-1',
	endAdornment: (
		<IconButton size="small" type="submit">
			<AddIcon />
		</IconButton>
	),
};
