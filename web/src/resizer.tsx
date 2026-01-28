import { useState, useRef, useEffect, Children, ReactNode, isValidElement, cloneElement } from "react";

type ResizerProps = {
  initial: number;
  min: number;
  children: ReactNode;
}

export default function Resizer() {
  return <div>FIX Resizer BEFORE USING</div>;
}

function BrokenResizer({ initial, min, children }: ResizerProps) {
  min ||= 200;
  const [size, setSize] = useState(initial || 300);
  const draggingRef = useRef(false);

  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement<{ style?: React.CSSProperties }>(child)) {
      return child;
    }

    if (!isDivider(child)) return child;

    return cloneElement(child, {
      style: {
        ...(child.props.style ?? {}),
        width: size
      }
    })
  })
  console.log(enhancedChildren);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!draggingRef.current) return;
      setSize(Math.max(min, e.clientX));
    }

    function onMouseUp() {
      draggingRef.current = false;
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return <div className="resizer">
    {enhancedChildren}
  </div>
}

const isDivider = (child: any) => {
  return child.props.className === "divider"
}

