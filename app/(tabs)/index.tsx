import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/API";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-5 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-white">Error:{moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest movie
              </Text>
              <FlatList
              data={movies}
              renderItem={({item})=>(
                <MovieCard
                {...item}
                />
              )}
              keyExtractor={(item)=>item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent:'flex-start',
                gap:20,
                paddingRight:5,
                marginBottom:10
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
