import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import * as React from 'react';
import { useEventEmitter } from '../../context/EventEmitterContext';
import { PoolObj } from '../../objs/PoolObj';

const SAVED_LIST_KEY_PREFIX = 'list-';

export declare interface SavedListsProps {
	onApplyList: (list: PoolObj) => void;
}

export const SavedLists: React.FunctionComponent<SavedListsProps> = ({
	onApplyList = () => undefined,
}) => {
	const [refreshKey, refresh] = React.useState({});

	const lists = React.useMemo(() => {
		const arr: PoolObj[] = [];

		for (const key in localStorage) {
			if (key.startsWith(SAVED_LIST_KEY_PREFIX)) {
				arr.push({
					id: 0,
					label: key.substring(SAVED_LIST_KEY_PREFIX.length),
					items: JSON.parse(localStorage[key]),
				});
			}
		}

		return arr;
	}, [refreshKey]);

	const eventEmitter = useEventEmitter();
	React.useEffect(() => {
		const handler = () => refresh({});
		eventEmitter.listen('saved-list-changed', handler);

		return () => {
			eventEmitter.unlisten('saved-list-changed', handler);
		};
	}, [eventEmitter]);

	const onDeleteSavedList = (list: PoolObj) => {
		delete localStorage[SAVED_LIST_KEY_PREFIX + list.label];
		refresh({});
	};
	return (
		<div>
			<Divider className="my-2" />
			<Typography variant="h6" component="span" children="Saved" />
			<List>
				{lists.map((list) => (
					<ListItem
						key={list.label}
						button
						onClick={() => onApplyList(list)}
					>
						<ListItemText primary={list.label} />
						<ListItemSecondaryAction>
							<IconButton onClick={() => onDeleteSavedList(list)}>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default SavedLists;
