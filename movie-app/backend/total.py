
from gemini_api_helper import get_movie_recommendations
from lastfm import get_song_metadata


def main():
   song_query = input("Enter a song query: ")


   try:
       metadata = get_song_metadata(song_query)
       print("Song Metadata:")
       print(metadata)
      
       recommendations = get_movie_recommendations(metadata)
       print("Movie Recommendations:")
       print(recommendations)
   except Exception as e:
       print("Error:", e)


if __name__ == "__main__":
   main()



