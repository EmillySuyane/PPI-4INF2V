import styles from ".MyTextList.module.css";
import { MyText } from "./MyText";

export default function App() {
  const texts = [
    { title: "Meu título 1", text: "Meu texto 1",},
    { title: "Meu título 2", text: "Meu texto 2",},
    { title: "Meu título 3", text: "Meu texto 3",},
    { title: "Meu título 4", text: "Meu texto 4",},
    { title: "Meu título 5", text: "Meu texto 5",},
    { title: "Meu título 6",text: "Meu texto 6",},
  ];

  return (
    //React Fragment
    <>
    {texts.map((text, index) => (
        <MyText key={index} title={`${index + 1}. ${text.title}`}>
          {text.text}
        </MyText>
      ))}
    </>
  );
}