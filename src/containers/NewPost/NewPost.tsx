import React, {useState} from 'react';

interface PostForm {
  title: string;
  description: string;
}

const NewPost = () => {
  const [formData, setFormData] = useState<PostForm>({
    title: '',
    description: '',
  });

  const changeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      title: '',
      description: '',
    });
  };

  return (
    <>
      <div className="row mb-5">
        <h1 className="text-warning text-center mb-5">Create new post</h1>
        <div className="row mt-2 justify-content-center">
          <div className="col-8">
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title" type="text" name="title"
                  className="form-control mb-3 py-2"
                  value={formData.title}
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description" name="description"
                  className="form-control mb-3 py-2"
                  value={formData.description}
                  onChange={changeForm}
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning text-white px-4 py-2 mb-5">
                Send form
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;