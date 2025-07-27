import Arrow from "./subcomponents/buttons/ArrowButton";
import React, {
  useState,
  useEffect,
  ReactNode,
  CSSProperties,
  useCallback,
} from "react";
import "./styles.css";

interface CarouselProps {
  children: ReactNode[];
}

function Carousel({ children }: CarouselProps): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [maxNumberOfVisibleCards, setMaxNumberOfVisibleCards] = useState<
    number | null
  >(null);
  const [carouselPosition, setCarouselPosition] = useState<number>(0);
  const [carouselTransformation, setCarouselTransformation] =
    useState<CSSProperties>({ transform: "translateX(0px)" });
  const [windowJustification, setWindowJustification] = useState<CSSProperties>(
    { justifyContent: "flex-start" }
  );
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  let countChildren = 0;

  const getCurrentCardWidth = useCallback((): number => {
    const card = document.querySelector(".carousel-card") as HTMLElement | null;
    if (!card) return 0;

    const cardComputedStyle = getComputedStyle(card);
    const width = parseInt(cardComputedStyle.width);
    const lateralWidth = parseInt(cardComputedStyle.margin.split(" ")[1]);
    return 2 * lateralWidth + width;
  }, []);

  const calculateMaxNumberOfVisibleCards = useCallback((): number => {
    const carouselWindow = document.querySelector(
      ".carousel-window"
    ) as HTMLElement | null;
    if (!carouselWindow) return 0;

    const windowWidth = parseInt(getComputedStyle(carouselWindow).width);
    return Math.min(10, Math.floor(windowWidth / getCurrentCardWidth()));
  }, [getCurrentCardWidth]);

  const calculateFixedPosition = useCallback(
    (currentIndex: number): number => {
      return -currentIndex * getCurrentCardWidth();
    },
    [getCurrentCardWidth]
  );

  const getForwardLimit = (): number =>
    calculateFixedPosition(children.length - 1);

  const disrespectsForwardLimit = (value: number): boolean =>
    value <= getForwardLimit();

  const disrespectsBackwardLimit = (value: number): boolean => value > 0;

  const isAllowedToMoveForward = (): boolean => {
    return (
      maxNumberOfVisibleCards !== null &&
      children.length > maxNumberOfVisibleCards &&
      index + 1 <= children.length - maxNumberOfVisibleCards
    );
  };

  const isAllowedToMoveBackward = (): boolean => {
    return index - 1 >= 0;
  };
  const moveForward = useCallback((): void => {
    let nextIndex = index + 1;

    if (nextIndex > children.length - 4) {
      nextIndex = 0;
      setCarouselPosition(calculateFixedPosition(nextIndex));
      setIndex(nextIndex);
      return;
    }

    setCarouselPosition(calculateFixedPosition(nextIndex));
    setIndex(nextIndex);
  }, [index, children.length, calculateFixedPosition]);
  const moveBackward = useCallback((): void => {
    let nextIndex = index - 1;
    if (nextIndex < 0) {
      nextIndex = children.length - 4;
    }

    setCarouselPosition(calculateFixedPosition(nextIndex));
    setIndex(nextIndex);
  }, [index, children.length, calculateFixedPosition]);

  const handleTouchStart = (event: React.TouchEvent): void => {
    setTouchPosition(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent): void => {
    if (touchPosition === null) return;

    const displacement = touchPosition - event.touches[0].clientX;
    setTouchPosition(event.touches[0].clientX);

    const calculatedPosition = carouselPosition - displacement;
    const calculatedIndex = Math.trunc(
      -calculatedPosition / getCurrentCardWidth()
    );

    setCarouselPosition(calculatedPosition);

    if (
      calculatedIndex !== index &&
      0 <= calculatedIndex &&
      calculatedIndex < children.length
    ) {
      setIndex(calculatedIndex);
    }
  };

  const handleTouchEnd = (): void => {
    if (touchPosition === null) return;

    if (disrespectsBackwardLimit(carouselPosition)) {
      setCarouselPosition(0);
    }

    if (disrespectsForwardLimit(carouselPosition)) {
      setCarouselPosition(getForwardLimit());
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    const updateMaxNumberOfVisibleCards = (): void => {
      const maxVisibleCards = calculateMaxNumberOfVisibleCards();
      setMaxNumberOfVisibleCards(maxVisibleCards);
      setCarouselPosition(calculateFixedPosition(index));
    };

    updateMaxNumberOfVisibleCards();

    window.addEventListener("resize", updateMaxNumberOfVisibleCards);

    return () => {
      window.removeEventListener("resize", updateMaxNumberOfVisibleCards);
    };
  }, [index, calculateFixedPosition, calculateMaxNumberOfVisibleCards]);

  useEffect(() => {
    setWindowJustification({
      justifyContent:
        children.length > (maxNumberOfVisibleCards ?? 0)
          ? "flex-start"
          : "center",
    });
  }, [maxNumberOfVisibleCards, children]);

  useEffect(() => {
    setCarouselTransformation({
      transform: `translateX(${carouselPosition}px)`,
    });
  }, [carouselPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveForward();
    }, 3000);
    return () => clearInterval(interval);
  }, [index, maxNumberOfVisibleCards, moveForward]);

  return (
    <div className="carousel">
      <Arrow
        action={moveBackward}
        direction="backward"
        clickability={isAllowedToMoveBackward()}
      />
      <div
        className="carousel-window"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel"
          style={{ ...carouselTransformation, ...windowJustification }}
        >
          {children.map((child) => (
            <div key={++countChildren} className="carousel-card">
              {child}
            </div>
          ))}
        </div>
      </div>
      <Arrow
        action={moveForward}
        direction="forward"
        clickability={isAllowedToMoveForward()}
      />
    </div>
  );
}

export default Carousel;
