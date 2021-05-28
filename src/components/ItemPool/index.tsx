import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Chip,
	IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon, Save as SaveIcon } from '@material-ui/icons';
import * as React from 'react';
import { useEventEmitter } from '../../context/EventEmitterContext';
import type { PoolObj } from '../../objs/PoolObj';
import { ItemPoolForm } from './Form';
import { ItemPoolLabel } from './Label';

export declare interface ItemPoolProps {
	expanded: boolean;
	poolData: PoolObj;
	onToggle: () => void;
	onDelete: () => void;
}

export const ItemPool: React.VoidFunctionComponent<ItemPoolProps> = ({
	expanded = false,
	poolData,
	onToggle = () => undefined,
	onDelete = () => undefined,
}) => {
	const [, refresh] = React.useState<{} | number>();
	const onAddItem = React.useCallback(
		(newItem: string) => {
			if (poolData.items.indexOf(newItem) === -1) {
				poolData.items.push(newItem);

				refresh({});
				return true;
			}
			return false;
		},
		[poolData.items, refresh]
	);

	const onRemoveItem = React.useCallback(
		(item: string) => {
			const index = poolData.items.indexOf(item);
			poolData.items.splice(index, 1);
			refresh({});
		},
		[poolData.items, refresh]
	);

	const onChangeLabel = React.useCallback(
		(newLabel: string) => {
			poolData.label = newLabel;
			refresh({});
		},
		[refresh]
	);

	const eventEmitter = useEventEmitter();
	const onSavePool = React.useCallback(() => {
		if (
			!localStorage[`list-${poolData.label}`] ||
			confirm(
				`${poolData.label} is already existed. Are you sure you want to override it?`
			)
		) {
			localStorage[`list-${poolData.label}`] = JSON.stringify(
				poolData.items
			);
			eventEmitter.emit('saved-list-changed');
		}
	}, [poolData, eventEmitter]);

	return (
		<Accordion expanded={expanded} onChange={onToggle}>
			<AccordionSummary>
				<ItemPoolLabel
					children={poolData.label}
					onChange={onChangeLabel}
				/>
				<IconButton size="small" className="ml-1" onClick={onSavePool}>
					<SaveIcon />
				</IconButton>
			</AccordionSummary>
			<AccordionDetails className="flex-wrap">
				{poolData.items.map((item) => (
					<Chip
						key={item}
						className="m-1"
						label={item}
						data-item={item}
						onDelete={() => onRemoveItem(item)}
					/>
				))}
			</AccordionDetails>
			<AccordionActions className="w-full flex items-center">
				<ItemPoolForm onAddItem={onAddItem} />
				<IconButton size="small" onClick={onDelete}>
					<DeleteIcon />
				</IconButton>
			</AccordionActions>
		</Accordion>
	);
};

export default ItemPool;
