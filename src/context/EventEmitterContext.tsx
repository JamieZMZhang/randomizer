import React from 'react';

type EventEmitFunction = (event: string, data?: any) => void;
type EventListeningFunction = (
	event: string,
	handler: EventEmitFunction
) => void;

type EventEmitterContextObj = {
	emit: EventEmitFunction;
	listen: EventListeningFunction;
	unlisten: EventListeningFunction;
};

const EventEmitterContext = React.createContext<EventEmitterContextObj>({
	emit: () => undefined,
	listen: () => undefined,
	unlisten: () => undefined,
});

export const EventEmitterHandler: React.FunctionComponent = ({ children }) => {
	const [value] = React.useState(() => {
		const dict: { [event: string]: EventEmitFunction[] } = {};

		const emit: EventEmitFunction = (event, data) => {
			if (dict[event]) {
				for (const handler of dict[event]) {
					setTimeout(handler, 0, event, data);
				}
			}
		};

		const listen: EventListeningFunction = (event, handler) => {
			dict[event] ??= [];
			dict[event].push(handler);
		};

		const unlisten: EventListeningFunction = (event, handler) => {
			dict[event] ??= [];
			dict[event] = dict[event].filter((h) => h !== handler);
		};

		return { emit, listen, unlisten };
	});

	return <EventEmitterContext.Provider value={value} children={children} />;
};

export const useEventEmitter = () => React.useContext(EventEmitterContext);
