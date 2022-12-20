import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, Upload, Table, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Box, Stack, Chip, Grid, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SearchCard from '../../components/Homepage/SearchCard';
import { getWords, getTags } from '../../api/search';
import { } from '../../components/sidebar/index.css';
import { getData, searchTagDB, postData, putData, deleteData } from "./apiAdmin/fetchData";
import SearchResultCard from '../../components/Homepage/SearchResultCard';
import Spinner from '../../components/Spinner';
import { } from '../../components/Homepage/Homepage.scss';


function Words() {
    const [open, setOpen] = useState(false);
    const [showExample, setShowExample] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    // ìnfor search 
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [words, setWords] = useState([])
    const [result, setResult] = useState([])
    const [dlWord, setDlWord] = useState();

    const handleOnSearch = async ({ keyword, type, context, topic }) => {
        setData({ keyword, type, context, topic })
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await getWords(data)
            setResult(res.data)
            setLoading(false)
        }
        fetchData()
    }, [data])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await getWords({})
            setWords(res.data.map(e => e.word))
            setLoading(false)
        }
        fetchData()
    }, [])
    const columns = [
        {
            title: 'Word',
            dataIndex: 'word',
            with: '20%',
            render: (record, data) => {
                return (
                    <div
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: 5,
                            height: 75,
                            padding: "5px 8px",
                            position: "relative",
                        }}
                    >
                        {data.word}
                    </div>
                );
            }
        },
        {
            title: 'Content',
            dataIndex: 'content',
            with: '20%',
            render: (record, data) => {
                const context1 = data.categories?.context;
                return (
                    <div
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: 5,
                            height: 75,
                            padding: "5px 8px",
                            position: "relative",
                        }}
                    >
                        {data.categories?.context ?
                            <div>
                                {context1.map((context) => {
                                    return (
                                        <span key={context.id}>{context.name} , </span>
                                    );
                                })}
                            </div>
                            : ""
                        }
                    </div>
                );
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            with: '20%',
            render: (record, data) => {
                return (
                    <div
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: 5,
                            height: 75,
                            padding: "5px 8px",
                            position: "relative",
                        }}
                    >
                        {data.categories?.type ?
                            <div>
                                {data.categories?.type.map(context => {
                                    return (<span>{context.name} , </span>);

                                })}
                            </div>
                            : ""
                        }
                    </div>

                );
            }
        },
        {
            title: 'Topic',
            dataIndex: 'topic',
            with: '20%',
            render: (record, data) => {
                return (
                    <div
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: 5,
                            height: 75,
                            padding: "5px 8px",
                            position: "relative",
                        }}
                    >
                        {data.categories?.topic ?
                            <div>
                                {data.categories?.topic.map(context => {
                                    return (
                                        <span> {context.name}</span>
                                    );

                                })}
                            </div>
                            : ""
                        }
                    </div>
                );
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            with: '20%',
            render: (record, data) => {
                return (
                    <div
                    >
                        <Button onClick={() => {
                            setKey(data.id);
                            setOpenDetail(true)

                        }} ><EyeOutlined /></Button>
                        <Button onClick={() => {
                            setOpenEdit(true);
                            // setWordData(data);
                            // setEditData(data);
                            // setOpenEdit(true);
                            // setMM(true);
                        }}>
                            <EditOutlined />
                        </Button>
                        <Button onClick={() => {
                            setOpenDelete(true);
                            setDlWord(data.id);
                        }}>
                            <DeleteOutlined />
                        </Button>

                    </div>
                );
            }
        },

    ]
    // display word details model

    const [openDetail, setOpenDetail] = useState(false);
    const [key, setKey] = useState();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        border: '1px solid #1A2027',
        height: '100%'
    }));

    const [item, setItem] = useState({});
    const [dLoading, setDLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setDLoading(true);
            getData(`words/${key}`).then((data) => {
                setItem(data)
            })
            setDLoading(false);
        }
        fetchData()
    }, [key])
    const ModelDetailWord = () => {
        return (
            <>
                <Modal
                    title="Details words"
                    open={openDetail}
                    onOk={() => setOpenDetail(false)}
                    onCancel={() => setOpenDetail(false)}
                    width={1000}
                >
                    {
                        dLoading || item.id !== key ? (<Spinner />) :
                            (
                                <Box key={item.id} className='search-result-card'>
                                    <div className='search-text'>
                                        <span className='kanji'>
                                            {item.word}
                                        </span>
                                        <span className='hiragana'>
                                            {item.furigana}
                                        </span>
                                    </div>
                                    <div className='description'>
                                        <Stack direction="row" spacing={1}>
                                            {item.tags?.map(tag => (
                                                <Chip key={tag.id} label={tag.name} color="primary" variant="outlined" />
                                            ))}
                                        </Stack>
                                    </div>
                                    <div className='example'>
                                        <Grid container spacing={2} >
                                            {item.meanings?.map((exp) => (
                                                <Grid item xs={2} sm={4} md={4} key={exp.id}>
                                                    <Item>
                                                        {/* <CardMedia
                                                            component="img"
                                                            height="240"
                                                            image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                                                            alt="Nicola Sturgeon on a TED talk stage"
                                                        /> */}
                                                        <b>Meaning</b>
                                                        <div className='ml-5'>
                                                            <p>{exp.meaning}</p>
                                                            <span>{exp.explanation_of_meaning}</span>
                                                        </div>
                                                        <b>Example</b>
                                                        <div className='ml-5'>
                                                            <p>{exp.example}</p>
                                                            <span>{exp.example_meaning}</span>
                                                        </div>
                                                        <b>Type</b>
                                                        <div className='ml-5'>
                                                            {
                                                                exp.tags?.filter(tag => tag.category_id === 2).map(t => ( <span>{t.name}, </span>))
                                                            }
                                                        </div>
                                                        <b>Context</b>
                                                        <div className='ml-5'>
                                                            {
                                                                exp.tags?.filter(tag => tag.category_id === 1).map(t => ( <span>{t.name}, </span>))
                                                            }
                                                        </div>
                                                        <b>Topic</b>
                                                        <div className='ml-5'>
                                                            {
                                                                exp.tags?.filter(tag => tag.category_id === 3).map(t => ( <span>{t.name}, </span>))
                                                            }
                                                        </div>

                                                    </Item>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                    <div className='related-words'>
                                        <h3>Related words</h3>
                                        <div>
                                            <p className='title'>類義語</p>
                                            {item.synonym?.map((e) => (
                                                <Chip key={e.id} label={e.word} variant="outlined" color="success" className='mr-3' />
                                            ))}
                                        </div>
                                        <div>
                                            <p className='title'>対義語</p>
                                            {item.antonym?.map((e) => (
                                                <Chip key={e.id} label={e.word} variant="outlined" color="success" className='mr-3' />
                                            ))}
                                        </div>
                                    </div>
                                </Box>
                            )
                    }
                </Modal>



            </>

        )
    }


    // edit data
    const [editData, setEditData] = useState();
    const EditWords = (data) => {

        const handleType = (value) => {
            const dt1 = editData;
            dt1.type = value;
            setEditData(dt1);
        }
        return (
            <Modal
                title="edit word"
                open={openEdit}
                onOk={() => setOpenEdit(false)}
                onCancel={() => setOpenEdit(false)}
                width={1000}
                okText="Save"
            >
                {/* <div>hello</div> */}
                <Form
                    name="edit-word"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="word"
                        name="word"
                        rules={[{ required: true, message: 'Please input your word!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="furigana"
                        name="furigana"
                        rules={[{ required: true, message: 'Please input your furigana!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="type" name="select-type">
                        <Select>
                            {categories
                                .filter((item) => item.category_id === 2)
                                .map((item) => (
                                    <Select.Option key={item.id} value={item.name}>{item.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <ListMeanings />
                    <h2 className='mt-4'>Related word</h2>
                    <Form.Item
                        label="synonyms"
                        name="synonyms"
                        rules={[{ required: true, message: 'Please input your synonyms!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Antonym"
                        name="Antonymic"
                        rules={[{ required: true, message: 'Please input your Antonym!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
    // model add 

    const [categories, setCategories] = useState([])
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const { TextArea } = Input;
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const [options, setOptions] = useState([]);
    const [meaningList, setMeaningList] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            const tagsData = await getTags()
            setCategories(tagsData.data)
            const obOptions = tagsData.data.filter(options => options.category_id === 3)
            const newArrayOptions = []
            obOptions.forEach((el) => {
                newArrayOptions.push({
                    label: el.name,
                    value: el.name
                })
            })
            setOptions(newArrayOptions)
        }
        fetchData()
    }, [])

    const Meaning = (idMeaning) => {
        const DeleteMeanings = () => {
            // const newMeaninglist = meaningList.filter(mean => mean !== idMeaning)
            // setMeaningList(newMeaninglist)
        }
        return (
            <div key={idMeaning}>
                <Form.Item
                    label="meaning"
                    name="means"
                    rules={[{ required: true, message: 'Please input your meaning!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="context" name="select-context">
                    <Select>
                        {categories
                            .filter((item) => item.category_id === 1)
                            .map((item) => (
                                <Select.Option key={item.id} value={item.name}>{item.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="topic"
                    name="topic"
                    rules={[{ required: true, message: 'Please input your topic!' }]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        initialValues={[]}
                        onChange={handleChange}
                        options={options}
                    />
                </Form.Item>

                <Form.Item label="picture" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" style={{ background: '#4096ff' }} onClick={DeleteMeanings}>
                        Delete
                    </Button>
                </Form.Item>
            </div>
        )
    }
    const ListMeanings = () => {
        const onAddBtnClick = event => {
            setMeaningList(meaningList.concat(<Meaning key={meaningList.length + 1} idMeaning={meaningList.length + 1} />));
        };

        return (
            <div>
                <Button className='mt-4 text-center' onClick={onAddBtnClick}> <PlusOutlined /> Meanings</Button>
                {
                    meaningList.length > 0 ?
                        meaningList.map((key, meaning) => <Meaning idMeaning={key} />) : 'No examples found'
                }
            </div>
        );
    };

    const ModelAdd = () => {
        return (
            <Modal
                title="add word"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                z-index={1000}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="word"
                        name="word"
                        rules={[{ required: true, message: 'Please input your word!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="furigana"
                        name="furigana"
                        rules={[{ required: true, message: 'Please input your furigana!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="type" name="select-type">
                        <Select>
                            {categories
                                .filter((item) => item.category_id === 2)
                                .map((item) => (
                                    <Select.Option key={item.id} value={item.name}>{item.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <ListMeanings />
                    <h2 className='mt-4'>Related word</h2>
                    <Form.Item
                        label="synonyms"
                        name="synonyms"
                        rules={[{ required: true, message: 'Please input your synonyms!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Antonym"
                        name="Antonymic"
                        rules={[{ required: true, message: 'Please input your Antonym!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ background: '#4096ff' }}>
                            add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }


    // model delete words

    const [openDelete, setOpenDelete] = useState(false);
    const DeleteWord = () => {
        const fetchData = async () => {
            const res = await deleteData(`words/${dlWord}`);
        }
        fetchData();
        const newData = result.filter(dt => dt.id !== dlWord);
        setResult(newData)
    }
    const ModelDelete = () => {
        const msg = `Are you sure want to delete words?`
        return (
            <Modal
                title={msg}
                centered
                open={openDelete}
                footer={[
                    <Row>
                        <Col span={12}>
                            <Button style={{ width: '80%' }} onClick={() => {
                                setOpenDelete(false)
                            }}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button style={{ width: '80%', background: '#1677ff', color: 'white', boder: 'none' }}
                                onClick={() => {
                                    DeleteWord()
                                    setOpenDelete(false)
                                }}>DELETE</Button>
                        </Col>
                    </Row>
                ]}
                onCancel={() => {
                    setOpenDelete(false)
                }}
                width={300}
            >
                <div style={{ display: 'none' }}>{dlWord}</div>

            </Modal>
        );

    }
    return (
        <>
            <div>
                <section>
                    <div className=" text-4xl  word-des " style={{ display: 'grid', marginTop: '5rem', padding: '20px' }} >
                        <SearchCard onSearch={handleOnSearch} words={words} />
                        <div>
                            <Button type="primary" style={{ background: '#4096ff', width: '30%' }} onClick={() => setOpen(true)}>
                                ADD
                            </Button>
                            {ModelAdd()}
                        </div>
                        {loading ? (
                            <Spinner />
                        ) : result?.length > 0 ? (
                            <>
                                <Table
                                    dataSource={result}
                                    pagination={{ defaultPageSize: 5 }}
                                    columns={columns}
                                />
                                <ModelDelete />
                                <EditWords data={editData} />
                                <ModelDetailWord />
                            </>

                        ) : (
                            <p>Your search did not match any documents.</p>
                        )
                        }


                    </div>

                </section>

            </div>
        </>
    );
}


export default Words;