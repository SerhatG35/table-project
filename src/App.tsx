import Table, { useCellData } from "./components/Table";
import { data } from "./data";
import styled from "styled-components";
import { Action } from "./components/Table/TableAction";
import { Column } from "./components/Table/TableColumn";
import { Header } from "./components/Table/TableHeader";
import { Cell } from "./components/Table/TableCell";

const StyledDiv = styled.div`
  display: flex;
`;

const ID = () => {
  const { data } = useCellData();
  return <span>{data}</span>;
};
const City = () => {
  const { data } = useCellData();
  return <h1>{data}</h1>;
};
const Common = () => {
  const { data } = useCellData();
  return <span>{data}</span>;
};

function App() {
  return (
    <div>
      <Table data={data}>
        <Action>
          <StyledDiv>
            <select>
              <option value="opt1">opt1</option>
            </select>
          </StyledDiv>
        </Action>

        <Column accessorKey="id" size={200}>
          <Header>ID</Header>
          <Cell>
            <ID />
          </Cell>
        </Column>
        <Column accessorKey="city" size={400}>
          <Header>City</Header>
          <Cell>
            <City />
          </Cell>
        </Column>
        <Column accessorKey="firstName">
          <Header>Name</Header>
          <Cell>
            <Common />
          </Cell>
        </Column>
        <Column accessorKey="age">
          <Header>Age</Header>
          <Cell>
            <Common />
          </Cell>
        </Column>
      </Table>
    </div>
  );
}

export default App;
