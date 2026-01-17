import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Carousel = React.memo(
  ({
    data = [],
    renderItem,
    onChange = () => {},
    interval = 2500,
    itemWidth = width,
  }) => {
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const indexRef = useRef(0);
    const isUserScroll = useRef(false);
    const [autoScroll, setAutoScroll] = useState(true);

    const getItemLayout = useCallback(
      (_, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
      }),
      [itemWidth]
    );

    useEffect(() => {
      if (!autoScroll || data.length <= 1) return;

      const timer = setInterval(() => {
        indexRef.current = (indexRef.current + 1) % data.length;
        flatListRef.current?.scrollToIndex({
          index: indexRef.current,
          animated: true,
        });
        onChange(indexRef.current);
      }, interval);

      return () => clearInterval(timer);
    }, [data.length, interval, autoScroll]);

    return (
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        windowSize={3}
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        onScrollBeginDrag={() => {
          isUserScroll.current = true;
          setAutoScroll(false);
        }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / itemWidth);
          indexRef.current = index;
          onChange(index);
          isUserScroll.current = false;
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    );
  }
);

export default Carousel;
