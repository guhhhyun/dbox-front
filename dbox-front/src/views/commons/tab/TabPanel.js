export default function TabPanel({ children, value, index, ...extra }) {
  return <div {...extra}>{value === index && children}</div>;
}
