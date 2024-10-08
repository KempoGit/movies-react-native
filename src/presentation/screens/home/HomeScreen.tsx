import React from 'react';
import { View, Text } from 'react-native';
import { useMovies } from '../../hooks/useMovies';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();

  const { isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage } = useMovies();

  if( isLoading ) {
    return (
      <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      style={{ backgroundColor: 'pink' }}>
        <FullScreenLoader />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: 'pink' }}>
      <View style={ { marginTop: top + 20, paddingBottom: 30 } } >
        {/* Principal */}
        <PosterCarousel movies={nowPlaying}/>

        <HorizontalCarousel movies={popular} title="Populares" loadNexPage={ popularNextPage }/>
        <HorizontalCarousel movies={topRated} title="Mejor calificadas" />
        <HorizontalCarousel movies={upcoming} title="Proximamente" />
      </View>
    </ScrollView>
  );
};
