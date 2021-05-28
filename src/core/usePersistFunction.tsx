import * as React from 'react';

export function usePersistFunction<T extends Function>(func: T): T {
	const fnRef = React.useRef<T>();
	fnRef.current = func;
	const [persistFn] = React.useState(() => (...args: any) => fnRef.current!(...args));

	return persistFn as any as T;
}