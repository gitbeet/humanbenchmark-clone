interface Props {
  gameName: string;
  result: string;
}

const ResultTable = ({ gameName, result }: Props) => {
  return (
    <tr>
      <td>{gameName}</td>
      <td className="flex gap-4">
        <div>Play</div>
        <div>Stats</div>
      </td>
      <td>{result && "?"}</td>
      <td>percentile</td>
    </tr>
  );
};

export default ResultTable;
