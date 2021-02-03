import { dom } from "./infra";

export const render = () => {
  const but = dom.div({
    id: "my-button",
    type: "button",
    on: {
      click: (e) => {
        const button = e.currentTarget as HTMLButtonElement;
        button.innerHTML += "xYx";
        button
          .animate(
            [
              { height: button.clientHeight + "px" },
              { height: "200px" },
              { height: button.clientHeight + "px" },
            ],
            {
              duration: 1000,
            }
          )
          .addEventListener("finish", () => {
            //test this code
            button.style.backgroundColor = "purple";
          });
      },
    },
    children: "42",
  });
  dom.findById("root").appendChild(but);

  console.log(but.getBoundingClientRect().height);
};
