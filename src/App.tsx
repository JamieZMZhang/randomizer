import {
	AppBar,
	Button,
	Container,
	CssBaseline,
	IconButton,
	ThemeProvider,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { Add as AddIcon, AddAlertRounded } from '@material-ui/icons';
import React from 'react';
import { appMuiTheme } from './appMuiTheme';
import ItemPool from './components/ItemPool';
import RandomizerModal from './components/RandomizerModal';
import SavedLists from './components/SavedLists';
import { EventEmitterHandler } from './context/EventEmitterContext';
import { usePersistFunction } from './core/usePersistFunction';
import type { PoolObj } from './objs/PoolObj';

function createItemPool() {
	return { id: +new Date(), label: 'Random Items', items: [] };
}

function App() {
	const [itemPools, setItemPools] = React.useState<PoolObj[]>([
		createItemPool(),
	]);
	const [expanded, setExpanded] = React.useState<PoolObj>(itemPools[0]);

	const addItemPool = React.useCallback(() => {
		setItemPools((pools) => {
			const newItem = createItemPool();
			setExpanded(newItem);
			return [...pools, newItem];
		});
	}, [setItemPools, setExpanded]);

	const onApplySavedList = React.useCallback((list: PoolObj) => {
		const pool = { ...list, id: +new Date() };
		setItemPools((pools) => [...pools, pool]);
		setExpanded(pool);
	}, []);

	const [showRandomizerModal, setShowRandomizerModal] = React.useState(false);
	const onBuildRandomizer = usePersistFunction(() => {
		for (const pool of itemPools) {
			if (pool.items.length === 0) {
				return alert(
					'There are empty lists. Please remove them to start'
				);
			}
		}

		setShowRandomizerModal(true);
	});

	return (
		<ThemeProvider theme={appMuiTheme}>
			<EventEmitterHandler>
				<CssBaseline />
				<div className="App">
					<AppBar position="sticky">
						<Toolbar>
							<Typography
								variant="h6"
								component="h1"
								className="flex-grow"
								children="Randomizer"
							/>
							<IconButton onClick={addItemPool}>
								<AddIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
					<Container maxWidth="lg" className="p-3">
						{itemPools.map((pool) => (
							<ItemPool
								key={pool.id}
								expanded={expanded === pool}
								poolData={pool}
								onToggle={() => setExpanded(pool)}
								onDelete={() =>
									setItemPools((pools) => {
										const index = pools.indexOf(pool);
										const newPools = pools.filter(
											(p) => p !== pool
										);

										setExpanded(
											newPools[
												Math.min(
													newPools.length - 1,
													index
												)
											]
										);
										return newPools;
									})
								}
							/>
						))}
						<div className="text-center my-2">
							<Button
								disabled={itemPools.length === 0}
								variant="contained"
								color="primary"
								children="Build Randomizer"
								onClick={onBuildRandomizer}
							/>
						</div>
						<SavedLists onApplyList={onApplySavedList} />
					</Container>
				</div>
				{showRandomizerModal && (
					<RandomizerModal
						lists={itemPools}
						onClose={() => setShowRandomizerModal(false)}
					/>
				)}
			</EventEmitterHandler>
		</ThemeProvider>
	);
}

export default App;
