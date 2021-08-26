import React, { useEffect, useState } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import axiosInstance from './../api/axios'
import { CREATECHANNEL } from './../api/Endpoint'
const Live = props => {
  const appId = 'e2168f29e26546e6b16b92e31a9b643f'
  const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' })
  const { userType, item } = props.location.state
  const [localAudio, setLocalAudio] = useState(undefined)
  const [localVideo, setLocalVideo] = useState(undefined)
  const [channelName, setChannelName] = useState('')
  const [token, setToken] = useState(undefined)
  const [uid, setUid] = useState('')
  // const [joinSucceed, setJoinSucceed] = useState(false)
  // const [peerIds, setPeerIds] = useState([])
  const createAudioVideo = async () => {
    const localAudio = await AgoraRTC.createMicrophoneAudioTrack()
    const localVideo = await AgoraRTC.createCameraVideoTrack()
    console.log('create local audio/video track success')
    setLocalAudio(localAudio)
    setLocalVideo(localVideo)
  }
  const publishStream = async () => {
    try {
      // Remove this line if the channel profile is not live broadcast.
      await client.setClientRole('host')
      await client.publish([localAudio, localVideo])
      console.log('publish success')
    } catch (e) {
      console.log('publish failed', e)
    }
  }
  useEffect(() => {
    console.log('userType ', userType)
    if (userType === 'host' && !localVideo && !localAudio) {
      createAudioVideo()
    }
    // if (userType === 'host' && localAudio && localVideo) {
    //   publishStream()
    // }
  }, [localVideo, localAudio])
  if (localVideo) {
    localVideo.play('farukh')
  }
  const startCall = async () => {
    try {
      const start = await client?.join(appId, channelName, token, uid)
      if (start && userType === 'host') {
        publishStream()
      }
    } catch (error) {
      console.log('error ', error)
    }
  }

  const endCall = async () => {
    await client?.leave()
    // setJoinSucceed(false)
    // setPeerIds([])
  }
  client?.on('user-published', async (remoteUser, mediaType) => {
    await client.subscribe(remoteUser, mediaType)
    if (mediaType === 'video') {
      console.log('subscribe video success')
      remoteUser.videoTrack.play('remote_play')
    }
    // if (mediaType === 'audio') {
    //   console.log('subscribe audio success')
    //   remoteUser.audioTrack.play()
    // }
  })
  const handleCreateChannel = async () => {
    let r = (Math.random() + 1).toString(36).substring(7)
    console.log('userType', userType)
    const url = CREATECHANNEL
    axiosInstance
      .patch(url, {
        _id: r,
        tourName: item.tourName,
        userType
      })
      .then(res => {
        console.log('res ', res.data)
        setToken(res.data.data.token)
        setChannelName(res.data.data.channelName)
        setUid(res.data.data.uid)
      })
      .catch(error => {
        console.log('error ', error)
      })
  }

  return (
    <div>
      <h1>
        {' '}
        Live Screen {userType} {item.tourName}
      </h1>
      <button
        className='buttonToken'
        onClick={() => {
          handleCreateChannel()
        }}
      >
        Get Token
      </button>
      <button
        className='buttonToken'
        onClick={() => {
          startCall()
        }}
      >
        Start
      </button>
      <button
        className='buttonToken'
        onClick={() => {
          endCall()
        }}
      >
        End
      </button>
      {userType === 'host' ? (
        <div id='farukh' style={{ height: 480, width: 640 }}></div>
      ) : (
        <div
          id='remote_play'
          style={{ height: 480, width: 640 }}
        ></div>
      )}
    </div>
  )
}

export default Live
