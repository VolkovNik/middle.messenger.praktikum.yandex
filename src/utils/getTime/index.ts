export const getTime = (time: string) => (
  new Date(time).toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })
);
