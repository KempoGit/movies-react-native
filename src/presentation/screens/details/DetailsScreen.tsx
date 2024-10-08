import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import { RootStackParams } from '../../navigation/StackNavigation';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movie/MovieHeader';
import { MovieDetails } from '../../components/movie/MovieDetails';
import { ScrollView } from 'react-native-gesture-handler';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';
// import { useRoute } from '@react-navigation/native';

interface Props extends StackScreenProps<RootStackParams, 'Details'>{}

export const DetailsScreen = ({ route }: Props) => {

  const { movieId } = route.params;

  const { isLoading, movie, cast } = useMovie(movieId);
  // const { movieId } = useRoute().params;

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
      <MovieHeader
      originalTitle={movie!.originalTitle}
      title={movie!.title}
      poster={movie!.poster}
      />
      <MovieDetails movie={movie!} cast={cast} />
    </ScrollView>
  );
};
