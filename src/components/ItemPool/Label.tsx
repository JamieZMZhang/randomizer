import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Typography,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import * as React from 'react';
import { usePersistFunction } from '../../core/usePersistFunction';

export type ItemPoolLabelProps = {
	children: string;
	onChange: (newLabel: string) => void;
};

export const ItemPoolLabel: React.FunctionComponent<ItemPoolLabelProps> = ({
	children,
	onChange = () => undefined,
}) => {
	const [labelEdit, setLabelEdit] = React.useState<string>();
	const [editError, setEditError] = React.useState('');

	const onFormSubmit = usePersistFunction((evt: React.FormEvent) => {
		evt.stopPropagation();
		evt.preventDefault();

		if (!labelEdit) {
			setEditError('This field is required');
		} else {
			onChange(labelEdit);
			setLabelEdit(undefined);
		}
	});

	const onInputChange = React.useCallback(
		(evt: React.ChangeEvent<HTMLInputElement>) => {
			setEditError('');
			setLabelEdit(evt.target.value);
		},
		[setEditError, setLabelEdit]
	);

	return (
		<>
			<Typography
				variant="h6"
				className="flex-grow"
				gutterBottom={false}
				children={children}
			/>
			<IconButton size="small" onClick={() => setLabelEdit(children)}>
				<EditIcon />
			</IconButton>

			{labelEdit !== undefined && (
				<Dialog open onClose={() => setLabelEdit(undefined)}>
					<form onSubmit={onFormSubmit}>
						<DialogContent>
							<TextField
								required
								value={labelEdit}
								onChange={onInputChange}
								error={!!editError}
								helperText={editError}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								children="Cancel"
								onClick={() => setLabelEdit(undefined)}
							/>
							<Button type="submit" children="Save" />
						</DialogActions>
					</form>
				</Dialog>
			)}
		</>
	);
};
