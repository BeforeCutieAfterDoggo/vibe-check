import { nanoid } from "nanoid";
import GroupForm from "../components/GroupForm";
export default function CreateGroup(props: any) {
  return (
    <main>
      <CreateNewCommunity />
    </main>
  );
}
export function CreateNewCommunity() {


  return (
    <>
      <GroupForm />
    </>
  );
}