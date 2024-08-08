import { Button } from "@repo/ui/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { SelectForm } from "./components/SelectCollege";


const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
}



export default async function Page() {
  const session = await getUserDetails();

  if(!session || !session.user) {
    return (
      <div>
        Dashboard which will have login, navbar
      </div>
    )
  } else {
    return (<SelectForm />)
  }
}
