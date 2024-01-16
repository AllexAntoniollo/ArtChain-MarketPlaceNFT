import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

export type NewMessage = {
  message: string;
  type: string;
};

export function Message(props: NewMessage) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          style={{ height: "420px", width: "370px" }}
          className="z-20 text-xl text-center fixed top-1/2 left-1/2 p-6 bg-white rounded-3xl -translate-x-1/2 -translate-y-1/2"
        >
          <IoCloseOutline
            onClick={handleClose}
            className="cursor-pointer float-right size-7 mb-5"
          />
          <div className="clear-both"></div>
          {props.message}
          {props.type === "load" ? (
            <div>Carregando</div>
          ) : props.type === "rejected" ? (
            <div>Rejeitado</div>
          ) : props.type === "successfully" ? (
            <div>Certo</div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
