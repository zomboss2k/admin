import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const type = 'DraggableItem';

export const DraggableItem = ({
  index,
  moveRow,
  className,
  style,
  children,
  ...restProps
}) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow?.(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <div
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{
        cursor: 'move',
        ...style,
      }}
      {...restProps}
    >
      {children}
    </div>
  );

  // return (
  //   <tr
  //     ref={ref}
  //     className={`${className}${isOver ? dropClassName : ''}`}
  //     style={{ cursor: 'move', ...style }}
  //     {...restProps}
  //   />
  // );
};
