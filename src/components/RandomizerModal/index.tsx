import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import * as React from 'react';
import { PoolObj } from '../../objs/PoolObj';

export declare interface RandomizerModalProps {
	lists: PoolObj[];
	onClose: () => void;
}

export const RandomizerModal: React.FunctionComponent<RandomizerModalProps> = ({
	lists,
	onClose = () => undefined,
}) => {
	const [items, setItems] = React.useState<string[]>([]);

	const pickRandom = React.useCallback(() => {
		setItems(
			lists.map(
				(list) =>
					list.items[Math.floor(list.items.length * Math.random())]
			)
		);
	}, [lists]);

	React.useEffect(pickRandom, []);

	return (
		<Dialog open fullWidth maxWidth="md">
			<DialogTitle className="relative">
				<div className="absolute right-0 top-0">
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent className="overflow-hidden">
				{items.map((item) => (
					<Typography
						key={+new Date()}
						className="text-center block animate-slideFromRight"
						variant="h6"
						component="span"
						children={item}
					/>
				))}
			</DialogContent>
			<DialogActions>
				<div className="w-full text-center">
					<Button
						children="Pick Random"
						variant="outlined"
						onClick={pickRandom}
					/>
				</div>
			</DialogActions>
		</Dialog>
	);
};

export default RandomizerModal;
