import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function CreateDetails() {
  let navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    async () => {
      if (loading) return;
      if (error) navigate("/signup");
      if (!user) {
        navigate("/signup");
      }

      getDoc(doc(db, "users", user.uid)).then((person) => {
        getDoc(doc(db, "records", person.data().token)).then((record) => {
          if (record.data() == undefined) {
            console.log("need to create record");
          } else {
            console.log("record created");
          }
        });
      });
    };
  });
  return <div>CreateDetails</div>;
}

export default CreateDetails;
