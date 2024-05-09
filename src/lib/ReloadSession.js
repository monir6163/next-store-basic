export const reloadSession = async () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};
