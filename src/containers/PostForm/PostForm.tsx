import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Post, PostApi} from '../../types';
import axiosApi from '../../axiosApi';

interface PostForm {
  title: string;
  description: string;
}

interface Props {
  onSubmit: (post: PostApi) => void;
  post: Post | null;
  changePost: (currentPost: Post) => void;
}

const currentDate = () => {
  const date = new Date(Date.now());
  return [
      date.getDate(),
      (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
      date.getFullYear()].join('.') + ' ' +
    [date.getHours(),
      date.getMinutes(),
      date.getSeconds()].join(':');
};

const PostForm: React.FC<Props> = ({onSubmit, post, changePost}) => {
  const [formData, setFormData] = useState<PostForm>({
    title: post ? post.title : '',
    description: post ? post.description : '',
  });
  const navigate = useNavigate();

  const changeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (post) {
      const newPost: PostApi = {
        datetime: post.datetime,
        title: formData.title,
        description: formData.description,
      };
      console.log(formData);

      changePost({
        ...post,
        description: formData.description,
        title: formData.title
      });

      try {
        await axiosApi.put(`/posts/${post.id}.json`, newPost);
      } catch (e) {
        console.error(e);
      }

    } else {
      const newPost = {
        title: formData.title,
        description: formData.description,
        datetime: currentDate(),
      };

      onSubmit(newPost);
    }

    setFormData({
      title: '',
      description: '',
    });
    navigate('/');
  };

  return (
    <>
      <div className="row mb-5">
        <h1 className="text-warning text-center mb-5">{post ? 'Edit' : 'Create new'} post</h1>
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
                {post ? 'Save' : 'Send form'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;