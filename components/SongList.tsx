import { AppContext } from "@/app/contexts/AppContext";
import { FileItem, PlayerContext } from "@/app/contexts/PlayerContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SongItem from "./Song";

export default function SongList() {
  const appContext = useContext(AppContext);
  const playerContext = useContext(PlayerContext);
  const [filesList, setFilesList] = useState<FileItem[]>([]);
  const router = useRouter();

  const theme = appContext?.theme === "dark" ? darkTheme : lightTheme;
  const dirUri = appContext?.dirUri;

  function handlePress(URI: string, name: string, index: number) {
    playerContext?.play(URI, name);
    playerContext?.setCurrentIndex(index);
    router.push("/player");
  }

  useEffect(() => {
    if (!dirUri) return;

    const loadFiles = async () => {
      const mp3Files: FileItem[] = [];
      const directory = new FileSystem.Directory(dirUri);
      const files = await directory.list();

      files.forEach((file, index) => {
        if (file.name.endsWith(".mp3")) {
          mp3Files.push({
            fileName: file.name.replace(".mp3", ""),
            fileURI: file.uri,
            fileIndex: index,
          });
        }
      });

      setFilesList(mp3Files);
      playerContext?.setSongs(mp3Files);
    };

    loadFiles();
  }, [dirUri]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={filesList}
        keyExtractor={(item) => item.fileURI}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <SongItem
            title={item.fileName}
            uri={item.fileURI}
            onPress={() => handlePress(item.fileURI, item.fileName, index)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
});