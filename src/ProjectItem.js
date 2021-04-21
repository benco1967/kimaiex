export function ProjectItem({project: {name, color}, onSelect}) {
  return (
    <div style={{backgroundColor: color}} onClick={onSelect}>{name}</div>
  );
}
