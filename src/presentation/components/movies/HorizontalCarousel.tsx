import React, { useEffect, useRef } from 'react';
import { View, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Movie } from '../../../core/entities/movie.entity';
import { FlatList } from 'react-native-gesture-handler';
import { MoviePoster } from './MoviePoster';

interface Props {
    movies: Movie[];
    title?: string;
    loadNexPage?: () => void;
}

export const HorizontalCarousel = ({movies, title, loadNexPage}: Props) => {

    const isLoading = useRef(false);

    useEffect(() => {
      setTimeout(() => {
        isLoading.current = false;
      }, 200);
    }, [movies]);


    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

        if( !isLoading ) {
            return;
        }

        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        const isEndReached = ( contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width;

        if( !isEndReached ) {
            return;
        }

        isLoading.current = true;

        loadNexPage && loadNexPage();

    };

  return (
    <View style={{height: title ? 260: 200}}>
      <Text style={{
        fontSize: 30,
        fontWeight: '300',
        marginLeft: 10,
        marginTop: 10,
      }}>
        {title}
      </Text>
      <FlatList
        data={ movies }
        renderItem={ ({ item }) => (
            <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={ (item, index) => `${item.id.toString()}-${index}` }
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={ onScroll }
        />
    </View>
  );
};
