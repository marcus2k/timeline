import { Box, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import HiddenFileInput from "./HiddenFileInput";
import Cropper from "./Cropper";
import MemoryMedia from "./MemoryMedia";
import { COLORS } from "../../utils/colors";
import UploadedMediaList from "./UploadedMediaList";
import DeleteMediaDialog from "./DeleteMediaDialog";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";

const heic2any = require("heic2any");

const MEDIA_LIMIT = 4; // can tweak
const MEGABYTE = 1048576;
const MAX_FILE_SIZE = 10 * MEGABYTE;

const UploadMediaForm = ({ existingMediaUrls, onComplete }) => {
  const initUrls = existingMediaUrls
    ? existingMediaUrls.map((media) => ({ ...media }))
    : [];
  const [mediaUrls, setMediaUrls] = useState(initUrls); // FINAL URLs
  const [editFileUrl, setEditFileUrl] = useState(null); // DRAFT FILE URL
  const [isCropView, setCropView] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(mediaUrls);
  const dispatch = useDispatch();

  const loadImage = (file) => {
    var fileUrl = URL.createObjectURL(file);
    setLoading(true);
    setCropView(false);
    setEditFileUrl(null);
    fetch(fileUrl)
      .then((res) => res.blob())
      .then((blob) => heic2any({ blob }))
      .then((res) => {
        fileUrl = URL.createObjectURL(res);
      })
      .catch((e) => {
        // do nothing
      })
      .finally(() => {
        setLoading(false);
        if (fileUrl) {
          setEditFileUrl(fileUrl);
          setCropView(true);
        } else {
          dispatch(
            setAlert("Only PNG, JPEG, HEIC images are accepted!", "error")
          );
          setCropView(false);
        }
      });
  };

  const addNewMedia = (e) => {
    var newFile = e.target.files[0];
    if (!newFile) {
      return;
    }
    if (newFile.size > MAX_FILE_SIZE) {
      dispatch(setAlert("Image file should not exceed 10MB.", "error"));
      return;
    }
    loadImage(newFile);
  };

  const setMediaPreview = (positionOfMedia) => {
    console.log(positionOfMedia);
    if (positionOfMedia >= mediaUrls.length) {
      return;
    }
    setPreviewUrl(mediaUrls[positionOfMedia].url);
  };

  const isMediaLimitReached = () => {
    return mediaUrls.length === MEDIA_LIMIT;
  };

  const deleteMediaByPosition = (positionOfMedia) => {
    let clonedMediaUrls = [...mediaUrls];
    if (previewUrl === clonedMediaUrls[positionOfMedia].url) {
      setPreviewUrl(null);
    }
    clonedMediaUrls.splice(positionOfMedia, 1);
    // Push the position. (Damn troublesome cause this means if we delete one photo, we need to update all the photos position as well)
    clonedMediaUrls = clonedMediaUrls.map((media) => {
      return {
        ...media,
        position: clonedMediaUrls.indexOf(media),
      };
    });
    setMediaUrls(clonedMediaUrls);
  };

  useEffect(() => {
    if (onComplete) {
      onComplete([...mediaUrls]);
    }
  }, [mediaUrls, onComplete]);

  const handleCropDone = (url) => {
    setEditFileUrl(null);
    const clonedMediaUrls = [...mediaUrls];
    setMediaUrls([
      ...clonedMediaUrls,
      {
        position: mediaUrls.length,
        url: url,
      },
    ]);
    setCropView(false);
    setPreviewUrl(url);
  };

  const handleCancelCrop = (e) => {
    e.preventDefault();
    setEditFileUrl(null);
    setCropView(false);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        style={{ textAlign: "center" }}
        // marginBottom={12}
      >
        <h3 style={{ color: COLORS.PRIMARY_PURPLE }}>Upload Media</h3>
        <p>Please upload 1 - {MEDIA_LIMIT} photos.</p>
        {isCropView ? (
          <Cropper fileUrl={editFileUrl} cropHandler={handleCropDone} />
        ) : (
          <MemoryMedia
            loading={loading}
            url={previewUrl}
            hasMedia={mediaUrls.length === 0 ? false : true}
          />
        )}
        <br />
        {!isCropView && (
          <UploadedMediaList
            mediaUrls={mediaUrls}
            setCropView={setCropView}
            setEditFileUrl={setEditFileUrl}
            setMediaPreview={setMediaPreview}
            deleteMediaByPosition={deleteMediaByPosition}
            selectedMediaUrl={previewUrl}
          />
        )}
        {isCropView ? (
          <Button variant="outlined" onClick={handleCancelCrop}>
            Cancel
          </Button>
        ) : (
          <Button
            variant="outlined"
            color={loading ? "inherit" : "primary"}
            disabled={loading || isMediaLimitReached()}
          >
            <label htmlFor="image-upload">
              Add New Media
              <HiddenFileInput handleChange={addNewMedia} />
            </label>
          </Button>
        )}
      </Box>
      <DeleteMediaDialog />
    </>
  );
};

export default UploadMediaForm;
