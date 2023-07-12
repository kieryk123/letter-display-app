import styled from "styled-components";

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 28px;
  background: #e9e9eb;
  border-radius: 32px;
  padding: 4px;
  transition: 200ms all;

  &:before {
    transition: 200ms all;
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: #36c759;

    &:before {
      transform: translate(32px, -50%);
    }
  }
`;

interface CheckBoxProps {
  id: number;
  checked: boolean;
  onToggle: (id: number) => void;
}

export const Checkbox: React.FC<CheckBoxProps> = ({
  id,
  checked,
  onToggle,
}) => (
  <Label htmlFor={`checkbox-${id}`}>
    <span>Banner {id}: </span>
    <Input
      data-testid="checkbox-input"
      type="checkbox"
      id={`checkbox-${id}`}
      checked={checked}
      onChange={() => onToggle(id)}
    />
    <Switch />
  </Label>
);
