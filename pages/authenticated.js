import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobalContext } from "../contexts/global";

function AuthenticatedPage() {
  const router = useRouter();
  const { isLoggedIn } = useGlobalContext();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <></>;
  }

  return (
    <div>
      <h2>This is an authenticated page</h2>
    </div>
  );
}

export default AuthenticatedPage;
