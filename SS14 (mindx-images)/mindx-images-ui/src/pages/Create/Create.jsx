// import MainLayout from "../components/Layout/MainLayout";
import "./create.style.css";
import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../../components/Layout/MainLayout";
import ImageUpLoading from "react-images-uploading";
import storage from "../../firebase/index";
import client from "../../api/index";

function Create() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [images, setImages] = useState([]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const image = images[0];
    if (image && form.title) {
      try {
        const imageUrl = await uploadFile(image.file);

        const res = await client({
          url: "/api/posts",
          method: "POST",
          data: {
            title: form.title,
            description: form.description,
            imageUrl: imageUrl,
          },
        });
        if (res.data.success) {
          alert("Success");
          setForm({ title: "", description: "" });
          setImages([]);
        }
        console.log(imageUrl);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onChangeForm = (e) => {
    const { value, name } = e.target;
    console.log(name);
    // setState cua Hook la ghi de (luu y ky)
    setForm({ ...form, [name]: value });
  };

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const uploadTask = storage.ref().child(file.name).put(file);
      const onProgress = () => {};
      const onError = (err) => reject(err);

      const onSuccess = () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => resolve(downloadURL));
      };

      uploadTask.on("state_changed", onProgress, onError, onSuccess);
    });
  };

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const hiddenButton = images.length > 0;
  return (
    <MainLayout>
      <div className="create-post mt-3 p-4">
        <Row>
          {/* voi xs: man hinh nho chiem 12 phan, md (man hinh trung binh do len) -> 4 phan */}
          <Col xs="12" md="4">
            <ImageUpLoading
              value={images}
              maxNumber={5}
              onChange={onChangeImage}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => {
                return (
                  <div className="upload-wrapper">
                    {!hiddenButton ? (
                      <Button onClick={onImageUpload}>Upload image</Button>
                    ) : (
                      ""
                    )}
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <div className="image-wrapper" onClick={onImageUpdate}>
                          <img
                            src={image.data_url}
                            alt="Not Found"
                            width="100"
                          />
                        </div>
                        <span className="remove-btn" onClick={onImageRemove}>
                          X
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            </ImageUpLoading>
          </Col>
          <Col xs="12" md="8">
            <Form onSubmit={onHandleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Enter title"
                  value={form.title}
                  name="title"
                  onChange={onChangeForm}
                />
              </Form.Group>
              <Form.Group controlId="textarea">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={form.description}
                  onChange={onChangeForm}
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}

export default Create;
