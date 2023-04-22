import Table from "./components/Table";
import { data } from "./data";
import { Column } from "./components/Table/TableColumn";
import { Header } from "./components/Table/TableHeader";
import { Cell } from "./components/Table/TableCell";
import { useTableData } from "./context/ColumnContext";
import { Toolbox } from "./Toolbox";
import styled from "styled-components";

const Common = () => {
  const { data } = useTableData();
  return <div style={{ margin: "16px" }}>{data.getValue()}</div>;
};

function App() {
  return (
    <Wrapper>
      <Table data={data}>
        <Column enableGrouping={false} accessorKey="name">
          <Header>NAME</Header>
          <Cell>
            <Common />
          </Cell>
        </Column>
        <Column size={50} accessorKey="age">
          <Header>AGE</Header>
          <Cell>
            <Common />
          </Cell>
        </Column>
        <Column accessorKey="city">
          <Header>CITY</Header>
          <Cell>
            <Common />
          </Cell>
        </Column>
        <Column accessorKey="food">
          <Header>FOOD</Header>
          <Cell>
            <Common />
          </Cell>
        </Column>
        <Column accessorKey="rating">
          <Header>RATING</Header>
          <Cell>
            <Common />
          </Cell>
        </Column>
        <Column accessorKey="color">
          <Header>COLOR</Header>
          <Cell>
            <Common />
          </Cell>
        </Column>
        <Toolbox />
      </Table>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  margin: 2rem;
`;
